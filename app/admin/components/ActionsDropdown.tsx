// app/admin/components/ActionsDropdown.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

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
        width: "10rem",
        zIndex: 1000,
      });
    }
  }, [open]);

  const handleAction = async (action: "ban" | "unban" | "delete") => {
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
          <div style={dropdownStyles} className="bg-white border border-gray-300 rounded shadow">
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer text-red-600"
              onClick={() => handleAction(active ? "ban" : "unban")}
            >
              {banLabel}
            </div>
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer text-red-600"
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
