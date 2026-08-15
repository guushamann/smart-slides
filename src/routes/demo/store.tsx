import { createFileRoute } from '@tanstack/react-router'
import { createStore } from '@tanstack/react-store'
import { useSelector } from '@tanstack/react-store'

const counterStore = createStore({ count: 0, step: 1 })

function increment() {
  counterStore.setState((state) => ({
    ...state,
    count: state.count + state.step,
  }))
}

function decrement() {
  counterStore.setState((state) => ({
    ...state,
    count: state.count - state.step,
  }))
}

function reset() {
  counterStore.setState((state) => ({ ...state, count: 0 }))
}

function setStep(step: number) {
  counterStore.setState((state) => ({ ...state, step }))
}

export const Route = createFileRoute('/demo/store')({
  component: StoreDemo,
})

function StoreDemo() {
  const count = useSelector(counterStore, (state) => state.count)
  const step = useSelector(counterStore, (state) => state.step)
  const double = useSelector(counterStore, (state) => state.count * 2)

  return (
    <main className="demo-page demo-center">
      <section className="demo-panel w-full max-w-md space-y-6">
        <div>
          <p className="island-kicker mb-2">TanStack Store</p>
          <h1 className="demo-title">Store Demo</h1>
          <p className="demo-muted mt-2">
            Shared reactive state outside of React, consumed with selectors.
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] p-6">
          <div>
            <p className="text-sm text-[var(--color-fg-muted)]">Count</p>
            <p className="text-4xl font-bold text-[var(--color-fg)]">{count}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[var(--color-fg-muted)]">Double</p>
            <p className="text-2xl font-semibold text-[var(--color-brand)]">
              {double}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={decrement} className="demo-button demo-button-secondary">
            −
          </button>
          <button onClick={increment} className="demo-button">
            +
          </button>
          <button
            onClick={reset}
            className="demo-button demo-button-danger ml-auto"
          >
            Reset
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--color-fg)]">
            Step size
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="w-full accent-[var(--color-primary-600)]"
          />
          <p className="text-sm text-[var(--color-fg-muted)]">
            Current step: {step}
          </p>
        </div>
      </section>
    </main>
  )
}
