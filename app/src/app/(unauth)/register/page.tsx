import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">Figure.in</h1>
          <p className="text-gray-600 mt-2">Lets Start your Hobby Journey!</p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
