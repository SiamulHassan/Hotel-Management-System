import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("clientErr:", error);
    throw new Error("Cabins could not be found");
  }
  return data;
}