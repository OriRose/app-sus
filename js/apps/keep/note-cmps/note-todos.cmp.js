export default {
    template: `
          <section>
              <ul>
                  <li v-for="todo in info.todos">{{todo}}</li>
              </ul>
          </section>
          `,
    props: ["info"]
  };