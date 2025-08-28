export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Our Services</h1>
      <ul className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <li className="p-6 shadow rounded-lg border hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-pink-500 mb-2">Web Design</h2>
          <p className="text-gray-600">
            Beautiful, responsive, and modern websites crafted with care.
          </p>
        </li>
        <li className="p-6 shadow rounded-lg border hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-pink-500 mb-2">Development</h2>
          <p className="text-gray-600">
            Robust full-stack applications tailored for your business needs.
          </p>
        </li>
        <li className="p-6 shadow rounded-lg border hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-pink-500 mb-2">Brand Strategy</h2>
          <p className="text-gray-600">
            Helping you stand out with creative branding and marketing.
          </p>
        </li>
        <li className="p-6 shadow rounded-lg border hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-pink-500 mb-2">Consulting</h2>
          <p className="text-gray-600">
            Guiding your digital transformation journey step by step.
          </p>
        </li>
      </ul>
    </div>
  );
}
