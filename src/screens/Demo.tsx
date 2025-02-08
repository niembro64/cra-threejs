import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  ReactElement,
} from 'react'

// Define the keys for localStorage as a type
type LocalStorageKey = 'input1' | 'input2'

// Helper type to capture the return type of setTimeout in the browser
type TimeoutId = ReturnType<typeof setTimeout>

function Demo(): ReactElement {
  const [input1, setInput1] = useState<string>('')
  const [input2, setInput2] = useState<string>('')

  // New states to track loading and saving status
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  // We'll store the timeout id in a ref so we can clear it if needed
  const saveTimeoutRef = useRef<TimeoutId | null>(null)

  // Load stored values from localStorage on component mount
  useEffect(() => {
    setIsLoading(true)
    const storedInput1 = localStorage.getItem('input1')
    const storedInput2 = localStorage.getItem('input2')

    if (storedInput1 !== null) {
      setInput1(storedInput1)
    }
    if (storedInput2 !== null) {
      setInput2(storedInput2)
    }
    setIsLoading(false)
  }, [])

  /**
   * Debounce function to save input to localStorage after a delay.
   */
  const scheduleSave = (key: LocalStorageKey, value: string) => {
    setIsSaving(true)
    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // Schedule a new save operation
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(key, value)
      setIsSaving(false)
    }, 500) // 500ms debounce - adjust as necessary
  }

  /**
   * Handlers for each input field
   */
  const handleInput1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInput1(newValue)
    scheduleSave('input1', newValue)
  }

  const handleInput2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInput2(newValue)
    scheduleSave('input2', newValue)
  }

  // Compute the product inline without storing it in state
  const num1 = parseFloat(input1)
  const num2 = parseFloat(input2)
  const product = !isNaN(num1) && !isNaN(num2) ? num1 * num2 : null

  return (
    <div className="mx-auto max-w-sm p-4 text-center">
      {(isLoading || isSaving) && (
        <div className="mb-4 flex items-center justify-center">
          <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </div>
      )}
      <h1 className="mb-4 text-2xl font-bold">Coach's Demo App</h1>
      <p>We will build your functionality here as a beta.</p>
      <p>
        Then I'll build it into an Android & iOS App and put it on the App
        stores.
      </p>

      <div className="mt-6">
        <label className="mb-2 block text-left">
          First Value:
          <input
            type="text"
            value={input1}
            onChange={handleInput1Change}
            className="mt-1 w-full rounded border p-2 text-black"
          />
        </label>

        <label className="mb-2 block text-left">
          Second Value:
          <input
            type="text"
            value={input2}
            onChange={handleInput2Change}
            className="mt-1 w-full rounded border p-2 text-black"
          />
        </label>
      </div>

      <div className="mt-4 text-lg font-semibold text-white">
        Product: {product !== null ? product : 'N/A'}
      </div>
    </div>
  )
}

export default Demo
