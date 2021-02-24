export default {
    template: `
          <section>
              <img :src="info.url">
          </section>
          `,
    props: ["info"]
  };