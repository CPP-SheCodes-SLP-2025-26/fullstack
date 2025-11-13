export default function Signup() {
  return (
    <section className="form-wrap">
      <h1>Sign Up</h1>
      <form className="stack">
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <button>Create account</button>
      </form>
    </section>
  );
}
