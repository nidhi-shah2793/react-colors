export default {
  up() {},
  down(size) {
    const sizes = {
      xs: "575.98px",
      sm: "767.98px",
      md: "991.98px",
      lg: "1199.98px",
    };
    return `@media (max-width: ${sizes.size}) {
        
    }`;
  },
};

up("sm"); //small and up
down("sm"); //small and down
