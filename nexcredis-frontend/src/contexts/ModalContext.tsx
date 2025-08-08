'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ModalState {
  isOpen: boolean
  title?: string
  content?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  onClose?: () => void
}

interface ModalContextType {
  modal: ModalState
  openModal: (modal: Omit<ModalState, 'isOpen'>) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

// Add this export line
export { ModalContext }

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ isOpen: false })

  const openModal = (modalData: Omit<ModalState, 'isOpen'>) => {
    setModal({ ...modalData, isOpen: true })
  }

  const closeModal = () => {
    if (modal.onClose) {
      modal.onClose()
    }
    setModal({ isOpen: false })
  }

  const value: ModalContextType = {
    modal,
    openModal,
    closeModal,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
