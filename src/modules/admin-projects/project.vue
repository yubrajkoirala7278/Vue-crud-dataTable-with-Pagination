<script setup>
import { onMounted, computed, reactive, ref, watch } from "vue";
import { useProperty } from "./store";
import { headers, getProjectStatusClass } from "./utils.js";

// ========fetch Property=========
const propertyStore = useProperty();
const filter = reactive({
  sortBy: [],
  perPage: 5,
  page: 1,
  facing: null,
});
const property = computed(() => propertyStore.property);
// onMounted(()=>{
//     propertyStore.fetchProperty(filter);
// })
// ========================================

// =========filters and pagination=========================
let timeOutId = null;
function loadItems({ page, itemsPerPage }) {
  clearTimeout(timeOutId);
  filter.perPage = itemsPerPage;
  filter.page = page;
  timeOutId = setTimeout(() => {
    propertyStore.fetchProperty(filter);
  }, 2000);
}
// reset filters
function resetFilters() {
  Object.assign(filter, {
    sortBy: [],
    perPage: 5,
    page: 1,
    facing: null,
  });
  loadItems({ page: 1 });
}
// =========================================
</script>
<template>
  <!-- ========Filters using select and input field===== -->
  <!-- select -->
  <v-select
    label="Select Property Facing"
    :items="['East', 'West', 'North', 'South']"
    v-model="filter.facing"
    @update:model-value="loadItems"
    class="w-50"
  ></v-select>
  <!-- textField -->
  <!-- <v-text-field label="Select Property Facing" variant="outlined"  v-model="filter.facing" @keyup="loadItems"  class="w-50" ></v-text-field> -->
  <!-- reset filters -->
  <v-btn class="mb-4 text-capitalize" color="red" @click="resetFilters()"
    >Reset</v-btn
  >
  <!-- ================================================= -->
  <!-- =======display data with dataTable========== -->
  <v-data-table-server
    :items-per-page="filter.itemsPerPage"
    :loading="propertyStore.isLoading"
    :headers="headers"
    :items="property"
    :items-length="propertyStore.totalProperty"
    :sort-by="filter.sortBy"
    :items-per-page-options="[
      { title: '5', value: 5 },
      { title: '10', value: 10 },
      { title: 'All', value: propertyStore.totalProperty },
    ]"
    @update:options="loadItems"
    fixed-header
    :hover="true"
    :height="property.length > 12 ? '70vh' : '100%'"
  >
    <!-- display status with unique colors -->
    <template v-slot:[`item.status_name`]="{ item }">
      <v-alert :color="getProjectStatusClass(item.status_name)" height="15">
        {{ item.status_name }}
      </v-alert>
    </template>
    <!-- display actions -->
    <template v-slot:[`item.action`]="{ item }">
      <div class="d-flex justify-space-evenly">
        <v-btn
          icon="mdi:mdi-pencil"
          variant="text"
          density="compact"
          color="warning"
        ></v-btn>
        <v-btn
          icon="mdi:mdi-trash-can-outline"
          variant="text"
          density="compact"
          color="red"
        ></v-btn>
        <v-btn
          icon="mdi:mdi-eye"
          variant="text"
          density="compact"
          color="green"
        ></v-btn>
      </div>
    </template>
  </v-data-table-server>
  <!-- ============================================= -->
</template>
