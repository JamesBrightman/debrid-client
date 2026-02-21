"use client";

import { Modal } from "@/components/modal/modal";

type ManualApprovalModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onCancel: () => void;
  onApprove: () => void;
};

export const ManualApprovalModal: React.FC<ManualApprovalModalProps> = ({
  isOpen,
  isLoading = false,
  onCancel,
  onApprove,
}) => {
  return (
    <Modal isOpen={isOpen} title="Manual Approval Required" onClose={onCancel}>
      <p className="text-sm text-slate-600">
        Are you sure? This action cannot be reversed.
      </p>
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-lg border border-sky-300 px-3 py-2 text-sm text-slate-900 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onApprove}
          disabled={isLoading}
          className="rounded-lg bg-coral-800 px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Yes
        </button>
      </div>
    </Modal>
  );
};



