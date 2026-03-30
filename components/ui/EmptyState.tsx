import Button from "@/components/ui/Button";

interface EmptyStateCTA {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
  cta?: EmptyStateCTA;
}

const EmptyState = ({ icon, message, cta }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center gap-4 py-16 text-center text-gray-500">
    <span className="text-5xl">{icon}</span>
    <p className="text-lg font-medium">{message}</p>
    {cta && (
      <Button variant="primary" size="md" onClick={cta.onClick}>
        {cta.label}
      </Button>
    )}
  </div>
);

export default EmptyState;
