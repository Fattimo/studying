import React from 'react'

import './App.css'

const ALPHANUMERIC_REGEX = /[\W_]+/g

const Popover = ({
    children,
    isOpen,
    onClose,
}: {
    children: React.ReactNode
    isOpen: boolean
    onClose: () => void
}) => {
    const id = React.useId()
    const alphanumericId = id.replace(ALPHANUMERIC_REGEX, '')

    const popoverRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (isOpen) {
            popoverRef.current?.showPopover()
        } else {
            popoverRef.current?.hidePopover()
        }
    }, [isOpen])

    return (
        <>
            <div
                popoverTarget={id}
                className="popoverAnchor"
                style={
                    {
                        '--anchor-name': `--${alphanumericId}`,
                    } as React.CSSProperties
                }
            >
                {children}
            </div>
            <div
                onToggle={(e) => {
                    if (e.newState === 'closed') onClose()
                }}
                className="popoverTest"
                style={
                    {
                        '--anchor-name': `--${alphanumericId}`,
                    } as React.CSSProperties
                }
                popover="auto"
                id={id}
                ref={popoverRef}
            >
                <section>
                    <button>something else</button>
                </section>
            </div>
        </>
    )
}

function App() {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <div>
            <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <button onClick={() => setIsOpen(true)}>button</button>
            </Popover>
        </div>
    )
}

export default App
