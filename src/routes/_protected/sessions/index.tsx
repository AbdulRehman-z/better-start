import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/sessions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/sessions/"!</div>
}
