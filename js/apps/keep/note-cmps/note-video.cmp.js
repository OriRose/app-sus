export default {
    template: `
          <section>
            <iframe
                width="150" height="112"
                :src="info.url">
            </iframe>
          </section>
          `,
    props: ["info"]
};