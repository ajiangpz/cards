<script setup lang="ts">
import { Carousel, Pagination, Slide } from "vue3-carousel";
import Loading from "./components/Loading.vue";
import "vue3-carousel/dist/carousel.css";
import { ref, computed } from "vue";
const STATUS = {
  INIT: "init",
  LOADING: "loading",
  RESULT: "result",
  DETAIL: "detail"
};
let pageStatus = ref(STATUS.INIT);
const isShowCards = computed(() => pageStatus.value == STATUS.INIT);
const isShowLoading = computed(() => pageStatus.value == STATUS.LOADING);
const isShowResult = computed(() => pageStatus.value == STATUS.RESULT);
let resultIndex = ref(0);
const handleStart = () => {
  pageStatus.value = STATUS.LOADING;
  setTimeout(() => {
    pageStatus.value = STATUS.RESULT;
    resultIndex.value = Math.floor(Math.random() * 3);
  }, 2000);
};

const back = () => {
  pageStatus.value = STATUS.INIT;
};

const cards = [
  { title: "一起看电影", img: "kandianying" },
  { title: "一起坐摩天轮", img: "motianlun" },
  { title: "一起压马路", img: "yamalu" }
];
</script>
<template>
  <div class="wrapper">
    <template v-if="isShowCards">
      <Carousel :itemsToShow="1.5" :wrapAround="true" :transition="500">
        <Slide v-for="(card, index) in cards" :key="index">
          <div class="carousel__item">
            <div>
              <SvgIcon
                :iconName="'icon-' + card.img"
                class="carousel__item-icon"
              ></SvgIcon>
              <div>{{ card.title }}</div>
            </div>
          </div>
        </Slide>
      </Carousel>
      <div class="btns" @click="handleStart">开始抽卡</div>
    </template>
    <template v-if="isShowLoading">
      <Loading></Loading>
    </template>
    <template v-if="isShowResult">
      <div class="result">
        <div class="carousel__item">
          <div>
            <SvgIcon
              :iconName="'icon-'+cards[resultIndex]?.img"
              class="carousel__item-icon"
            ></SvgIcon>
            <div>{{cards[resultIndex]?.title}}</div>
          </div>
        </div>
      </div>
      <div class="btns" @click="handleStart">继续抽卡</div>
      <div class="btns" @click="back">返回首页</div>
    </template>
  </div>
</template>
<style>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
  padding: 20px 0;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.9);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.9);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
.carousel__item {
  min-height: 300px;
  width: 100%;
  background-color: pink;
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 32px;
  background: pink;
  max-width: 100px;
  border-radius: 5px;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  color: #fff;
  top: 400px;
}
.result {
  display: flex;
  justify-content: center;
  align-content: center;
}
.result .carousel__item {
  width: 240px;
}

.carousel__item .svg-icon.carousel__item-icon {
  width: 8em;
  height: 8em;
}

</style>
