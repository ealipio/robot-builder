<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    <div class="top-row">
      <div :class="[saleBorderClass, 'top', 'part']">
        <div class="robot-name">
          {{selectedRobot.head.title }}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div>
        <img :src="selectedRobot.head.src" title="head">
        <button @click="selectPreviousHead()" class="prev-selector">&#9668;</button>
        <button @click="selectNextHead()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftArm.src" title="left arm">
        <button @click="selectPreviousLeftArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm()" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" title="left arm">
        <button @click="selectPreviousTorsos()" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorsos()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.src" title="left arm">
        <button @click="selectPreviousRightArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightArm()" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" title="left arm">
        <button @click="selectPreviousBases()" class="prev-selector">&#9668;</button>
        <button @click="selectNextBases()" class="next-selector">&#9658;</button>
      </div>
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
import createdHookMixin from './created-hook-mixin';

function getPreviousValidIndex(index, length) {
  const deprecatedIndex = index - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}
function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

export default {
  name: 'RobotBuilder',
  mixins: [createdHookMixin],
  data() {
    return {
      availableParts,
      selectHeadIndex: 0,
      selectLeftArmIndex: 0,
      selectRightArmIndex: 0,
      selectTorsosIndex: 0,
      selectBasesIndex: 0,
      cart: [],
    };
  },
  computed:{
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },
    headBorderStyle() {
      return {
        border:  this.selectedRobot.head.onSale ?
        '3px solid red' : '3px solid #aaa'
      };
    },
    selectedRobot() {
      return {
        head: availableParts.heads[this.selectHeadIndex],
        leftArm: availableParts.arms[this.selectLeftArmIndex],
        rightArm: availableParts.arms[this.selectRightArmIndex],
        torso: availableParts.torsos[this.selectTorsosIndex],
        base: availableParts.bases[this.selectBasesIndex],
      }
    }
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
    selectNextHead() {
      this.selectHeadIndex = getNextValidIndex(
        this.selectHeadIndex,
        this.availableParts.heads.length,
      );
    },
    selectPreviousHead() {
      this.selectHeadIndex = getPreviousValidIndex(
        this.selectHeadIndex,
        this.availableParts.heads.length,
      );
    },
    selectPreviousRightArm() {
      this.selectRightArmIndex = getPreviousValidIndex(
        this.selectRightArmIndex,
        this.availableParts.arms.length,
      );
    },
    selectNextRightArm() {
      this.selectRightArmIndex = getNextValidIndex(
        this.selectRightArmIndex,
        this.availableParts.arms.length,
      );
    },
    selectPreviousTorsos() {
      this.selectTorsosIndex = getPreviousValidIndex(
        this.selectTorsosIndex,
        this.availableParts.torsos.length,
      );
    },
    selectNextTorsos() {
      this.selectTorsosIndex = getNextValidIndex(
        this.selectTorsosIndex,
        this.availableParts.torsos.length,
      );
    },
    selectPreviousBases() {
      this.selectBasesIndex = getPreviousValidIndex(
        this.selectBasesIndex,
        this.availableParts.bases.length,
      );
    },
    selectNextBases() {
      this.selectBasesIndex = getNextValidIndex(
        this.selectBasesIndex,
        this.availableParts.bases.length,
      );
    },
    selectNextLeftArm() {
      this.selectLeftArmIndex = getNextValidIndex(
        this.selectLeftArmIndex,
        this.availableParts.arms.length,
      );
    },
    selectPreviousLeftArm() {
      this.selectLeftArmIndex = getPreviousValidIndex(
        this.selectLeftArmIndex,
        this.availableParts.arms.length,
      );
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
