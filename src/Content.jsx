import "./App.css";

export default function Content() {
  return (
    <main className="content">
      <section className="block">
        <h1>Відпочинок у Коропово</h1>
        <div className="order">
            <div className="order__section">
                <p>Дата заселення1</p>
                <p><a href="/">Додати</a></p>
            </div>
              <div className="order__section">
                <p>Дата виселення</p>
                <p><a href="/">Додати</a></p>
            </div>
              <div className="order__section">
                <p>Кількість гостей</p>
                <p><a href="/">1 гість</a></p>
            </div>

        </div>
      </section>

      <section className="block">
        <h1>Відпочинок на лоні природи</h1>
        <p>Дозволь собі розслабитись!</p>
      </section>

      <section className="block">
        <h1>Затишок і краєвиди</h1>
        <p>у гармонії з природою</p>
      </section>
    </main>
  );
}