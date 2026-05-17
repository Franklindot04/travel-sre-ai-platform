export default function ConfirmPage() {
  return (
    <div className="card p-6">
      <p className="text-sm font-semibold uppercase text-blue-700 dark:text-blue-300">
        Confirmation
      </p>
      <h1 className="mt-2 text-2xl font-bold text-foreground">
        Booking request received
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        This mock confirmation view keeps the booking journey readable while
        the backend flow is incomplete or running outside the frontend
        workspace.
      </p>
    </div>
  );
}
