// app/admin/components/ActionsDropdown.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

type ActionsDropdownProps = {
  userId: string;
  active: boolean;
};

export default function ActionsDropdown({ userId, active }: ActionsDropdownProps) {
  const [open, setOpen] = useState(false);
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyles({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: "8rem",
        zIndex: 1000,
      });
    }
  }, [open]);

  const handleAction = async (action: "ban" | "unban" | "delete" | "edit") => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Action failed");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
    setOpen(false);
  };

  const banLabel = active ? "Ban" : "Unban";
  const banAction = active ? "ban" : "unban";

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-600 hover:text-black"
      >
        ⋮
      </button>
      {open &&
        createPortal(
          <div
            style={dropdownStyles}
            className="bg-white border border-gray-300 rounded shadow"
          >
            {/* Edit Action */}
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAction("edit")}
            >
              Edit
            </div>
            {/* Ban/Unban Action */}
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAction(banAction)}
            >
              {banLabel}
            </div>
            {/* Delete Action */}
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAction("delete")}
            >
              Delete
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
