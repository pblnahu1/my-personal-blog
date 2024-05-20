import { fnElementsDOM } from "./dom.mjs";
import { fnSearchItems } from "./search.mjs";
import { fnLikesItems } from "./likes.mjs";

export const fn_render_dom = (a) => {
    fnElementsDOM(a);
    fnSearchItems();
    fnLikesItems();
}