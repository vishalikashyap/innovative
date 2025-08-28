export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* <h1 className="text-4xl font-bold text-purple-700 mb-6">Our Blog</h1> */}
      <div className="grid md:grid-cols-3 gap-8">
        <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-pink-500 mb-2">Post 1</h2>
          <p className="text-gray-600">
            Exploring the latest design trends of 2025 and how they shape user
            experience.
          </p>
        </article>
        <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-pink-500 mb-2">Post 2</h2>
          <p className="text-gray-600">
            How to build scalable applications with modern frameworks.
          </p>
        </article>
        <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-pink-500 mb-2">Post 3</h2>
          <p className="text-gray-600">
            Why brand identity matters more than ever in the digital world.
          </p>
        </article>
      </div>
    </div>
  );
}
