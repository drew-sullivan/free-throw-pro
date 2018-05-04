<template>
  <div>
    <div v-if="sortedStats.length">
      <p class="top-label">Free Throw Average</p>
      <h1>{{ freeThrowAverage }}%</h1>
    </div>

    <avg-chart v-if="sortedStats.length && runningAverages.length"
      v-bind:sortedStats="sortedStats" v-bind:runningAverages="runningAverages" class="stat-chart"></avg-chart>
    <helper-shots-chart v-if="sortedStats.length" v-bind:sortedStats="sortedStats" class="stat-chart"></helper-shots-chart>

    <button v-show="!adding" @click="toggle" class="btn btn-success mobile-button util-margin-20">&#43; New Session</button>
    <div  v-show="adding" class="form-row">
      <div class="form-group col-md-2">
        <label>Date</label>
        <input type="date" placeholder="date" name="date" value="date" v-model="date" class="form-control">
      </div>
      <div class="form-group col-md-2">
        <label>Out of 10</label>
        <input class="form-control" type="number" placeholder="Out of 10" name="of10" value="num" v-model="of10">
      </div>
      <div class="form-group col-md-2">
        <label>Short</label>
        <input class="form-control" type="number" placeholder="Short" name="short" value="num" v-model="short">
      </div>
      <div class="form-group col-md-2">
        <label>Long</label>
        <input class="form-control" type="number" placeholder="Long" name="long" value="num" v-model="long">
      </div>
      <div class="form-group col-md-2">
        <label>Left</label>
        <input class="form-control" type="number" placeholder="Left" name="left" value="num" v-model="left">
      </div>
      <div class="form-group col-md-2">
        <label>Right</label>
        <input class="form-control" type="number" placeholder="Right" name="right" value="num" v-model="right">
      </div>
      <div class="form-group col-md-2">
        <label>Legit</label>
        <input class="form-control" type="number" placeholder="Legit" name="legit" value="num" v-model="legit">
      </div>
      <button @click="cancel" class="btn btn-secondary mobile-button">Cancel</button>
      <button @click="add" class="btn btn-primary mobile-button">Submit</button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th v-for="(shotType, i) in shotTypes" :key="i">{{ shotType | caps }}</th>
        </tr>
        <tr>
          <th>AVG</th>
          <th v-for="(shotType, i) in shotTypes" :key="i">{{ getAvg(sortedStats, shotType) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="sortedStats.length">
          <td>{{ sortedStats[0].date | shortDate }}</td>
          <td v-for="(shotType, i) in shotTypes" :key="i" v-bind:class="getColorStatus(shotType)">
            {{ sortedStats[0][shotType] }}
          </td>
        </tr>
        <tr v-for="(stat, index) in sortedStats.slice(1)" :key="index">
          <td>{{ stat.date | shortDate}}</td>
          <td v-for="(shotType, i) in shotTypes" :key="i">{{ stat[shotType] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script src="./bball.js"></script>
<style scoped src="./bball.css"></style>
