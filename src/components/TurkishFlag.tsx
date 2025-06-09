interface TurkishFlagProps {
  className?: string;
}

export default function TurkishFlag({ className }: TurkishFlagProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={className}
    >
      <circle cx="8" cy="8" r="8" fill="#E30A17"/>
      <circle cx="6.4" cy="8" r="3.2" fill="white"/>
      <circle cx="7" cy="8" r="2.56" fill="#E30A17"/>
      <path d="M9.6 6.72L10.88 9.12L8.32 7.84L10.88 6.56L9.6 8.96L9.6 6.72Z" fill="white"/>
    </svg>
  );
} 