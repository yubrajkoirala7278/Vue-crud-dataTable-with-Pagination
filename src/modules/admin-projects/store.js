import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchPropertyApi} from "./service";

export const useProperty = defineStore("property", () => {
  // ===========reactive state====================
  const property = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const totalProperty = ref(0);
  const projectList=ref([]);
  // ============================================

  // ============FETCH(GET) Property with filter==========
  const fetchProperty = async (propertyFilter) => {
    try {
      isLoading.value = true;
      const apiData = await fetchPropertyApi(propertyFilter);
      totalProperty.value = apiData.data.meta.total;
      property.value = apiData.data.data.map((item, index) => {
        return { sno: index + 1, ...item };
      });
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };
  // ====================================================

  // ==========return all the method and values=========
  return {
    isLoading,
    error,
    fetchProperty,
    property,
    totalProperty
  };
  // ===================================================
});
