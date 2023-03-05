<template>
  <router-view/>
</template>

<style>
*{
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}


::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--color-neutral-3);
  margin-left: 1px;
}

::-webkit-scrollbar-thumb:hover{
  border-radius: 10px;
  background-color:var(--color-neutral-5);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background: transparent;
}

</style>
