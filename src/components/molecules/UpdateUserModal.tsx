import { UserModal } from "@/components/molecules/UserModal";
import { Input as InputAntd, Button as ButtonAntd } from "antd";
import { PencilLineIcon } from "lucide-react";
import { useState } from "react";

export function UpdateUserModal({ user = {} }: { user?: any }) {
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  return (
    <>
      <ButtonAntd
        icon={<PencilLineIcon className="w-[16px]" />}
        type="text"
        onClick={() => {
          setIsUpdateUserModalOpen(true);
        }}
      ></ButtonAntd>
      <UserModal
        isUpdate={true}
        initialData={user}
        isOpen={isUpdateUserModalOpen}
        setIsOpen={open => {
          setIsUpdateUserModalOpen(open);
        }}
      />
    </>
  );
}
