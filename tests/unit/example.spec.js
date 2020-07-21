import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import BaseIcon from "@/components/BaseIcon.vue";

describe("BaseIcon.vue", () => {
  it("renders props.svg when passed", () => {
    const name = "activity";
    const wrapper = shallowMount(BaseIcon, {
      propsData: { name }
    });
    console.log(wrapper);
    expect( wrapper.svg() ).to.include( 'test' );
  });
});
