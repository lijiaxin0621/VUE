<template>
  <div>
    <div class="head">
      <img :src="imageUrl" alt />
    </div>
    <map
      class="map"
      longitude="longitude"
      latitude="latitude"
    ></map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "../../assets/images/avatar/5.png",
      longitude: 114.504216,
      latitude: 30.552472,
    };
  }
};
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
  z-index: 100;
}
</style>