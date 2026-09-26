export default function BrandDots({ size = 40 }) {
  const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
  return (
    <div className="flex">
      {colors.map((color, i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            marginLeft: i === 0 ? 0 : -size * 0.25,
            zIndex: colors.length - i,
          }}
          className="rounded-full border-2 border-white"
        />
      ))}
    </div>
  );
}