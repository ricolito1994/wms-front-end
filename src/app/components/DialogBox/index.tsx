import { Modal } from 'antd';
interface DialogBoxProps {
    isOpen : boolean,
    setIsOpen : Function,
    modalTitle: String,
    form : any | null,
    handleClose: Function | null,
    onSave? : Function | null,
    children : any,
}
const DialogBox = ({
    isOpen, 
    setIsOpen, 
    modalTitle, 
    form,
    handleClose,
    onSave,
    children
} : DialogBoxProps) => {
    const handleOk = () => {
        //setIsOpen(!isOpen)
        if(form) form.submit()
        else if (onSave) onSave()
    }
    const handleCancel  = () => {
        if(handleClose) handleClose();
        setIsOpen(!isOpen)
    }
    return (
        <>
            <Modal
                title={modalTitle}
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {children}
            </Modal>
        </>
    )
}
export default DialogBox;