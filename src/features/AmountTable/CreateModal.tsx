import React, { FC, useState } from "react"
import Modal from "react-modal"
import { AmountType } from "../../Types"
import Input from "../../components/Input"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

Modal.setAppElement("#root")

type Props = {
  title: string
  onAdd: (data: AmountType) => void
}
const CreateModal: FC<Props> = ({ title, onAdd }) => {
  const [data, setData] = useState<AmountType>({
    amount: 0,
    date: "",
    title: "",
  })
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAdd(data)
    closeModal()
  }

  return (
    <div>
      <button onClick={openModal}>Add</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>New {title}</h2>
        <hr />
        <form onSubmit={onSubmit} className="create-modal-form">
          <input
            type="date"
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
          <Input
            value={data.title}
            onChange={(val) => setData({ ...data, title: val })}
            placeholder="Enter Title"
          />
          <Input
            value={String(data.amount)}
            onChange={(val) => setData({ ...data, amount: Number(val) })}
            placeholder="Enter Amount"
          />
          <div className="modal-actions">
            <button onClick={closeModal}>Close</button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default CreateModal
