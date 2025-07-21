import LocalizedLink from '@/components/LocalizedLink';

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
      <LocalizedLink href="/">Back to Home</LocalizedLink>
      <h1 className="text-20 font-bold mb-8">Pretendard Font Face Test</h1>
      <div className="space-y-4">
        {weights.map(weight => (
          <div key={weight.name}>
            <p className={`text-16 ${weight.class}`}>
              {weight.name} ({weight.class}) - The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
