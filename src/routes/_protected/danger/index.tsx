import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/danger/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/danger/"!</div>
}
