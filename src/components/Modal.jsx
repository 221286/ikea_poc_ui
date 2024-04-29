import classnames from "classnames";
import { CloseOutlined } from "@ant-design/icons";
import Button from "./Button";

const Modal = (props) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    isOkRequired = true,
    onOk,
    onCancel,
    okText = "Ok",
    cancelText = "Cancel",
    okType = "button",
    disableOkButton = false,
  } = props;
  return (
    <div
      className={classnames(
        "fixed inset-0 z-[60] transition-opacity duration-200",
        {
          "pointer-events-auto opacity-100": isOpen,
          "pointer-events-none opacity-0": !isOpen,
        }
      )}
    >
      <div
        className="fixed inset-0 transition-opacity bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-full max-w-2xl p-6 transition-transform bg-white rounded-lg">
          <div
            className={classnames("flex items-center justify-between", {
              "mb-4": !!title,
            })}
          >
            <h2 className="text-2xl font-bold">{title}</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
              title="close"
            >
              <CloseOutlined />{" "}
            </button>
          </div>
          <div className="max-h-[80vh] overflow-y-auto">{children}</div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={onCancel ?? onClose}>
              {cancelText}
            </Button>
            {isOkRequired && (
              <Button
                type={okType}
                variant="primary"
                onClick={onOk}
                disabled={disableOkButton}
              >
                {okText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
