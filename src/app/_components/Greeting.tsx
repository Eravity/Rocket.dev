type GreetingProps = {
  username?: string;
};

export default function Greeting({ username = "Champion" }: GreetingProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="text-center md:text-left">
      <h1 className="text-5xl md:text-4xl font-bold text-neutral-900">
        {greeting}, {username}👋
      </h1>
      <p className="text-lg md:text-base text-neutral-500">Great to have you here!</p>
    </div>
  );
}
