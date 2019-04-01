<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    <div class="top-row">
        <!-- <div class="robot-name">
          {{selectedRobot.head.title }}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div> -->
      <PartSelector />
    </div>
    <div class="middle-row">
      <PartSelector />
      <PartSelector />
      <PartSelector />
    </div>
    <div class="bottom-row">
      <PartSelector />
    </div>

    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" :key="index">
            <td>{{robot.head.title}}</td>
            <td class="cost">{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import availableParts from '../data/parts';
import PartSelector from './PartSelector.vue';

export default {
  name: 'RobotBuilder',
  components: {PartSelector},
  data() {
    return {
      availableParts,
      cart: [],
      selectedRobot: {
        head: {},
        leftArm: {},
        rightArm: {},
        torso: {},
        base: {},
      },
    };
  },
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost +
      robot.leftArm.cost +
      robot.rightArm.cost +
      robot.base.cost +
      robot.torso.cost;

      this.cart.push(Object.assign({}, robot, {cost}));
    },
  },
};
</script>

<style lang='scss'>
.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
  img {
    width: 165px;
  }
}
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}

.left {
  border-right: none;
  img {
    transform: rotate(-90deg);
  }
  .prev-selector {
    top: -28px;
    left: -3px;
    width: 144px;
    height: 25px;
  }
  .next-selector {
    top: auto;
    bottom: -28px;
    left: -3px;
    width: 144px;
    height: 25px;
  }
}
.right {
  border-left: none;
  img {
    transform: rotate(90deg);
  }
  .next-selector {
    top: auto;
    bottom: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }
  .next-selector {
    right: -3px;
  }
  .prev-selector {
    top: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width:100%;
}
.sale{
  color: red;
}
.content{
  position: relative;
}
.add-to-cart{
  position: absolute;
  right: 30px;
  width: 220px;
  padding: 3px;
  font-size: 16px;
}
td, th{
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost{
  text-align: right;
}
.sale-border {
  border: 3px solid red;
}
</style>
