import Link from 'next/link';

export default function FontTestPage() {
  const weights = [
    { name: 'Thin', class: 'font-thin' },
    { name: 'ExtraLight', class: 'font-extralight' },
    { name: 'Light', class: 'font-light' },
    { name: 'Regular', class: 'font-normal' },
    { name: 'Medium', class: 'font-medium' },
    { name: 'SemiBold', class: 'font-semibold' },
    { name: 'Bold', class: 'font-bold' },
    { name: 'ExtraBold', class: 'font-extrabold' },
    { name: 'Black', class: 'font-black' },
  ];

  return (
    <div className="p-8">
      <Link href="/">Back to Home</Link>
      <h1 className="text-4xl font-bold mb-8">Pretendard Font Face Test</h1>
      <div className="space-y-4">
        {weights.map(weight => (
          <div key={weight.name}>
            <p className={`text-2xl ${weight.class}`}>
              {weight.name} ({weight.class}) - The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
