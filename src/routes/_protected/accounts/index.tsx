import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/accounts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/accounts/"!</div>
}
