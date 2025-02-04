import React, { useTransition } from 'react'

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

const TransitionTesting = () => {
    const [triggered, setTriggered] = React.useState(false)
    const [isPending, startTransition] = useTransition()
    const handleClick = () => {
        startTransition(async () => {
            await new Promise<void>((res) =>
                setTimeout(() => {
                    res()
                }, 2000)
            )
            setTriggered((t) => !t)
        })
    }

    return (
        <div>
            <button onClick={handleClick}>Trigger me!</button> state:{' '}
            {triggered.toString()} | isPending: {isPending.toString()}
        </div>
    )
}

/**
 * What do we want when it comes to forms?
 *
 * 1. Validation
 * 2. Submission
 * 3. Related fields
 *
 * We have FormData, which is just an obj with kv pairs.
 * Form<FormDataShape>
 *
 * <Form>
 *  <Input value={value1} setValue={setValue1} />
 *  <Input value={value2} setValue={setValue2} validate={(formData) => boolean | string} />
 *  <Input value={value3} setValue={setValue3} />
 * </Form>
 */

const FormTesting = () => {
    return <form>test</form>
}

const CallbackRefTesting = () => {
    const [visible, setVisible] = React.useState(false)
    const intersectionObserverRef = React.useCallback(
        (target: Element | null) => {
            const observer = new IntersectionObserver(([entry]) => {
                setVisible(entry.isIntersecting)
            })

            if (!target) {
                return
            }

            observer.observe(target)

            return () => {
                observer.unobserve(target)
                observer.disconnect()
            }
        },
        []
    )

    return (
        <div>
            <div ref={intersectionObserverRef} />
            <br />
            <br />
            <br />
            <br />
            something cool - {visible ? 'visible' : 'nah'}
            <div style={{ height: '100vh' }}></div>
        </div>
    )
}

function App() {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <div>
            <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <button onClick={() => setIsOpen(true)}>button</button>
            </Popover>

            <TransitionTesting />

            <FormTesting />

            <CallbackRefTesting />
        </div>
    )
}

export default App
