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
          <th>of 10</th>
          <th>Legit</th>
          <th>Short</th>
          <th>Long</th>
          <th>Left</th>
          <th>Right</th>
        </tr>
        <tr>
          <th>Avg</th>
          <th>{{ getAvg(this.sortedStats, 'of10') }}</th>
          <th>{{ getAvg(this.sortedStats, 'legit') }}</th>
          <th>{{ getAvg(this.sortedStats, 'short') }}</th>
          <th>{{ getAvg(this.sortedStats, 'long') }}</th>
          <th>{{ getAvg(this.sortedStats, 'left') }}</th>
          <th>{{ getAvg(this.sortedStats, 'right') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="sortedStats.length">
          <td>{{ shortDate(sortedStats[0].date) }}</td>
          <td v-bind:class="getColorStatus('of10')">{{ sortedStats[0].of10 }}</td>
          <td v-bind:class="getColorStatus('legit')">{{ sortedStats[0].legit }}</td>
          <td v-bind:class="getColorStatus('short')">{{ sortedStats[0].short }}</td>
          <td v-bind:class="getColorStatus('long')">{{ sortedStats[0].long }}</td>
          <td v-bind:class="getColorStatus('left')">{{ sortedStats[0].left }}</td>
          <td v-bind:class="getColorStatus('right')">{{ sortedStats[0].right }}</td>
        </tr>
        <tr v-for="(stat, index) in sortedStats.slice(1)" :key="index">
          <td>{{ shortDate(stat.date) }}</td>
          <td>{{ stat.of10 }}</td>
          <td>{{ stat.legit }}</td>
          <td>{{ stat.short }}</td>
          <td>{{ stat.long }}</td>
          <td>{{ stat.left }}</td>
          <td>{{ stat.right }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script src="./bball.js"></script>
<style scoped src="./bball.css"></style>
