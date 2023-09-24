import NationalStadiumJPG from "../../assets/nationalstadium.jpg";

export const NationalStadium = (props) => {
  return (
    <svg
      version="1.1"
      id="vg"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      className="h-fit w-full"
      viewBox="0 0 1150 700"
      enableBackground="new 0 0 1150 700"
      xmlSpace="preserve"
    >
      <image
        overflow="visible"
        enableBackground="new"
        xlinkHref={NationalStadiumJPG}
        transform="matrix(0.9293 0 0 0.9293 40.7939 26.019)"
        alt="national stadium"
      ></image>
      <path
        id="PH5"
        className={`${
          "CAT2" in props.availableSections &&
          "PH5" in props.availableSections["CAT2"] &&
          props.availableSections["CAT2"]["PH5"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT2");
          props.setCurrSection("PH5");
        }}
        d="M385.405,528.069v5.886c0,0,13.318,12.313,35.623,11.693c18.431-12.7,41.044-28.653,41.044-28.653l-0.465-5.73
            l-27.803-16.96L385.405,528.069z"
      />
      <path
        id="606"
        className={`${
          "CAT6" in props.availableSections &&
          "606" in props.availableSections["CAT6"] &&
          props.availableSections["CAT6"]["606"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT6");
          props.setCurrSection("606");
        }}
        d="M559.667,673.5c0.424,7.124,6.167,14.646,6.167,27.5c-24.006,3.254-50.167,3.168-50.167,3.168
            c-0.763-4.008-0.497-2.809-0.847-4.667c-0.348-1.857,1.68-21.666,1.68-21.666S540.674,674.374,559.667,673.5z"
      />
      <polygon
        id="607"
        className={`${
          "CAT6" in props.availableSections &&
          "607" in props.availableSections["CAT6"] &&
          props.availableSections["CAT6"]["607"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT6");
          props.setCurrSection("607");
        }}
        points="570.333,699.668 631.203,691.084 631.203,686.593 616,658.835 564.333,671.335 "
      />
      <polygon
        id="608"
        className={`${
          "CAT6" in props.availableSections &&
          "608" in props.availableSections["CAT6"] &&
          props.availableSections["CAT6"]["608"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT6");
          props.setCurrSection("608");
        }}
        points="621,657.999 621,662.666 633.666,688.834 694.166,675.165 694.166,670.832 671.5,641.332 "
      />
      <path
        id="609"
        className={`${
          "CAT6" in props.availableSections &&
          "609" in props.availableSections["CAT6"] &&
          props.availableSections["CAT6"]["609"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT6");
          props.setCurrSection("609");
        }}
        d="M677.5,638.938v5.684c0,0,17.083,13.467,26.583,27.842c22-6,58.917-18.627,58.917-18.627l-0.125-4.709
            l-38.125-30.753L677.5,638.938z"
      />
      <path
        id="610"
        className={`${
          "CAT6" in props.availableSections &&
          "610" in props.availableSections["CAT6"] &&
          props.availableSections["CAT6"]["610"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT6");
          props.setCurrSection("610");
        }}
        d="M770.984,651.464c0,0,29.04-8.134,54.517-21.299c0-3.098,0-4.337,0-4.337l-50.25-35.333l-44.834,24.483v5.185
            L770.984,651.464z"
      />
      <polygon
        id="611"
        className={`${
          "CAT5" in props.availableSections &&
          "611" in props.availableSections["CAT5"] &&
          props.availableSections["CAT5"]["611"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT5");
          props.setCurrSection("611");
        }}
        points="830.46,629.131 885.753,602.298 885.753,596.838 825.814,558.582 777.606,587.313 777.606,590.703 "
      />
      <polygon
        id="612"
        className={`${
          "CAT5" in props.availableSections &&
          "612" in props.availableSections["CAT5"] &&
          props.availableSections["CAT5"]["612"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT5");
          props.setCurrSection("612");
        }}
        points="888.076,601.639 934.153,572.211 934.153,565.086 871.891,529.309 827.827,558.271 827.827,559.867 "
      />
      <polygon
        id="613"
        className={`${
          "CAT5" in props.availableSections &&
          "613" in props.availableSections["CAT5"] &&
          props.availableSections["CAT5"]["613"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT5");
          props.setCurrSection("613");
        }}
        points="938.646,570.113 983.019,538.904 983.019,531.547 924.783,501.81 880.99,530.464 880.99,534.538 "
      />
      <polygon
        id="614"
        className={`${
          "CAT5" in props.availableSections &&
          "614" in props.availableSections["CAT5"] &&
          props.availableSections["CAT5"]["614"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT5");
          props.setCurrSection("614");
        }}
        points="984.723,535.962 1028.864,502.98 1028.864,496.708 960.329,465.654 918.896,495.469 918.896,501.81 "
      />
      <path
        id="615"
        className={`${
          "CAT5" in props.availableSections &&
          "615" in props.availableSections["CAT5"] &&
          props.availableSections["CAT5"]["615"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT5");
          props.setCurrSection("615");
        }}
        d="M1030.49,500.808c15.333-11.923,32.216-34.383,32.216-34.383v-6.656l-61.412-27.727l-39.263,30.899v3.482
            C962.031,466.425,1012.727,492.061,1030.49,500.808z"
      />
      <polygon
        id="616"
        className={`${
          "CAT5" in props.availableSections &&
          "616" in props.availableSections["CAT5"] &&
          props.availableSections["CAT5"]["616"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT5");
          props.setCurrSection("616");
        }}
        points="1064.255,462.633 1092.985,427.087 1092.985,420.505 1038.39,398.202 1002.302,430.417 1002.302,432.497 
            "
      />
      <path
        id="617"
        className={`${
          "CAT5" in props.availableSections &&
          "617" in props.availableSections["CAT5"] &&
          props.availableSections["CAT5"]["617"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT5");
          props.setCurrSection("617");
        }}
        d="M1095.309,423.371l23.853-37.947v-7.666l-51.422-13.708c0,0-13.707,23-28.42,33.146
            c0,1.381-0.013,1.381-0.013,1.381L1095.309,423.371z"
      />
      <path
        id="405"
        className={`${
          "CAT4" in props.availableSections &&
          "405" in props.availableSections["CAT4"] &&
          props.availableSections["CAT4"]["405"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT4");
          props.setCurrSection("405");
        }}
        d="M444.5,635.875l-7,29.208v4.575c0,0,25.416,0.232,38.916-2.304c1-9.875,3.084-32.729,3.084-32.729
	L444.5,635.875z"
      />
      <path
        id="406"
        className={`${
          "CAT4" in props.availableSections &&
          "406" in props.availableSections["CAT4"] &&
          props.availableSections["CAT4"]["406"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT4");
          props.setCurrSection("406");
        }}
        d="M484.5,633.625l-3.375,27.625v4.625c0,0,25-0.792,59.75-6.125c-3-15.21-6.75-31.875-6.75-31.875L484.5,633.625z"
      />
      <path
        id="407"
        className={`${
          "CAT4" in props.availableSections &&
          "407" in props.availableSections["CAT4"] &&
          props.availableSections["CAT4"]["407"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT4");
          props.setCurrSection("407");
        }}
        d="M538.75,626.875v4.625l6.875,26.125c0,0,15.16-0.375,52.143-10.75c-0.268-3.75-0.518-2.75-0.518-2.75L583.5,616.5
	L538.75,626.875z"
      />
      <path
        id="408"
        className={`${
          "CAT4" in props.availableSections &&
          "408" in props.availableSections["CAT4"] &&
          props.availableSections["CAT4"]["408"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT4");
          props.setCurrSection("408");
        }}
        d="M588.375,615.125v3.25l13.875,26.5c0,0,7.167-1.375,49.792-15c-0.313-2.016-0.541-4.083-0.541-4.083
	s-9.376-14.292-17.876-25.917C606.25,610.25,588.375,615.125,588.375,615.125z"
      />
      <path
        id="409"
        className={`${
          "CAT4" in props.availableSections &&
          "409" in props.availableSections["CAT4"] &&
          props.availableSections["CAT4"]["409"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT4");
          props.setCurrSection("409");
        }}
        d="M638,599.021v5.354l18.667,23.5c0,0,32.999-13.042,47.166-21.708c-0.333-3.5-0.333-3.5-0.333-3.5l-24.875-22.792
	C678.625,579.875,662.365,589.742,638,599.021z"
      />
      <path
        id="410"
        className={`${
          "CAT4" in props.availableSections &&
          "410" in props.availableSections["CAT4"] &&
          props.availableSections["CAT4"]["410"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT4");
          props.setCurrSection("410");
        }}
        d="M682.5,578.375V581l25.5,22.875c0,0,34.625-19.625,48.5-26.75c0-3.25,0-3.25,0-3.25l-24.125-22L682.5,578.375z"
      />
      <polygon
        id="411"
        className={`${
          "CAT3" in props.availableSections &&
          "411" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["411"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("411");
        }}
        points="735.375,550.125 735.375,551.875 760.5,575.5 805.875,549 805.875,545.625 777,525.625 "
      />
      <polygon
        id="412"
        className={`${
          "CAT3" in props.availableSections &&
          "412" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["412"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("412");
        }}
        points="820.75,496.375 852.25,517.125 852.25,520.75 809.25,547 779.375,526.375 779.375,523.25 "
      />
      <path
        id="413"
        className={`${
          "CAT3" in props.availableSections &&
          "413" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["413"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("413");
        }}
        d="M823,494.75c0,3.107,0,3.107,0,3.107l32.75,20.518l40.625-29.75v-2.875L864,467.625
	C864,467.625,836.25,488.125,823,494.75z"
      />
      <polygon
        id="414"
        className={`${
          "CAT3" in props.availableSections &&
          "414" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["414"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("414");
        }}
        points="867.375,465.25 867.375,468.25 900,486.625 939.625,456.875 939.625,453.75 903.875,436.5 "
      />
      <polygon
        id="415"
        className={`${
          "CAT3" in props.availableSections &&
          "415" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["415"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("415");
        }}
        points="906.625,434.5 906.625,436.5 941.75,454 977.5,426.25 977.5,422 941.375,405.375 "
      />
      <path
        id="416"
        className={`${
          "CAT3" in props.availableSections &&
          "416" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["416"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("416");
        }}
        d="M944.625,403v2.375L980,423.25c0,0,22.375-19,37.375-33.625c-0.375-2.875,0-3.25,0-3.25l-41.25-13.125
	L944.625,403z"
      />
      <path
        id="417"
        className={`${
          "CAT3" in props.availableSections &&
          "417" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["417"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("417");
        }}
        d="M979.625,370.125v2.625l40.375,13.5c0,0,13.438-10.875,27.813-30.75c-0.063-2.75,0-3.375,0-3.375l-43.438-10
	L979.625,370.125z"
      />
      <path
        id="107B"
        className={`${
          "CAT2" in props.availableSections &&
          "107B" in props.availableSections["CAT2"] &&
          props.availableSections["CAT2"]["107B"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT2");
          props.setCurrSection("107B");
        }}
        d="M559.5,544.084v1.874l20,59.042c0,0,0.875,0.625,21.125-5.125c0-3,0-3,0-3l-28-56L559.5,544.084z"
      />
      <path
        id="107A"
        className={`${
          "CAT2" in props.availableSections &&
          "107A" in props.availableSections["CAT2"] &&
          props.availableSections["CAT2"]["107A"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT2");
          props.setCurrSection("107a");
        }}
        d="M505.875,554.875l20.5,58.125v3.5c0,0-6.5,1.625-15.375,3.625c-4.25-21.375-13.875-63.625-13.875-63.625"
      />
      <polygon
        id="109"
        className={`${
          "CAT2" in props.availableSections &&
          "109" in props.availableSections["CAT2"] &&
          props.availableSections["CAT2"]["109"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT2");
          props.setCurrSection("109");
        }}
        points="601.417,531.084 601.417,534.501 643.833,584.667 677.083,569.417 677.083,566.333 622.083,521.084 "
      />
      <path
        id="110"
        className={`${
          "CAT2" in props.availableSections &&
          "110" in props.availableSections["CAT2"] &&
          props.availableSections["CAT2"]["110"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT2");
          props.setCurrSection("110");
        }}
        d="M626.5,519.5v2.188l54.334,45.479c0,0,25.75-13.563,40.916-22.229c0-1.078,0-0.969,0-2.166
	c-12.083-9.688-59.25-44.271-59.25-44.271"
      />
      <polygon
        id="111"
        className={`${
          "CAT2" in props.availableSections &&
          "111" in props.availableSections["CAT2"] &&
          props.availableSections["CAT2"]["111"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT2");
          props.setCurrSection("111");
        }}
        points="667.833,496.375 667.833,498.5 726.316,541.288 765.167,518.996 765.167,514.996 702.5,474.83 "
      />
      <path
        id="112"
        className={`${
          "CAT1" in props.availableSections &&
          "112" in props.availableSections["CAT1"] &&
          props.availableSections["CAT1"]["112"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT1");
          props.setCurrSection("112");
        }}
        d="M708.5,471.328v3.502l62.125,40.498c0,0,17.875-12.667,36.875-23.667c0.167-3.166,0.002-4,0.002-4L741,449.161
	C741,449.161,722.833,464.494,708.5,471.328z"
      />
      <polygon
        id="113"
        className={`${
          "CAT1" in props.availableSections &&
          "113" in props.availableSections["CAT1"] &&
          props.availableSections["CAT1"]["113"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT1");
          props.setCurrSection("113");
        }}
        points="746.875,446.5 746.875,450.75 812.5,487.75 847.375,463.5 847.375,458.875 778.5,423.75 "
      />
      <path
        id="114"
        className={`${
          "CAT1" in props.availableSections &&
          "114" in props.availableSections["CAT1"] &&
          props.availableSections["CAT1"]["114"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT1");
          props.setCurrSection("114");
        }}
        d="M782.375,422v1.75l69.875,36.75L884,435.125v-3.5c0,0-52-24.875-71.375-33.5
	C798.529,410.344,782.375,422,782.375,422z"
      />
      <path
        id="115"
        className={`${
          "CAT1" in props.availableSections &&
          "115" in props.availableSections["CAT1"] &&
          props.availableSections["CAT1"]["115"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT1");
          props.setCurrSection("115");
        }}
        d="M817.25,395.125v3.125l72.25,33.625l31-26.5v-3.563l-74.875-30.063C836.375,381.25,817.25,395.125,817.25,395.125
	z"
      />
      <polygon
        id="116"
        className={`${
          "CAT1" in props.availableSections &&
          "116" in props.availableSections["CAT1"] &&
          props.availableSections["CAT1"]["116"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT1");
          props.setCurrSection("116");
        }}
        points="849.625,367.375 849.625,370 924.875,400.625 955.25,373.25 955.25,370.75 877.25,342.125 "
      />
      <path
        id="117"
        className={`${
          "CAT1" in props.availableSections &&
          "117" in props.availableSections["CAT1"] &&
          props.availableSections["CAT1"]["117"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT1");
          props.setCurrSection("117");
        }}
        d="M880,338.5v2.25L959.125,370c0,0,10.25-12.125,20.5-23.25c0-3.125,0-4.25,0-4.25L892,324.125L880,338.5z"
      />
      <path
        id="106"
        className={`${
          "CAT3" in props.availableSections &&
          "106" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["106"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("106");
        }}
        d="M471.001,561.167v59.667l0.167,4.5c0,0,22.167,0.333,34.5-4c0.167-1.5,0-3,0-3l-13.667-60.333L471.001,561.167z"
      />
      <path
        id="105"
        className={`${
          "CAT3" in props.availableSections &&
          "105" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["105"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("105");
        }}
        d="M466.104,625.979l1.897-64.313c0,0-15.333,1.166-21.833,1c-2.167,9.167-14.5,59-14.5,59v4.834L466.104,625.979z"
      />
      <path
        id="104"
        className={`${
          "CAT3" in props.availableSections &&
          "104" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["104"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("104");
        }}
        d="M442.75,563.125v5.71l-18.125,57.666c0,0-24.361,1.382-34.736-0.583c-0.25-1.59,0.111-3.293,0.111-3.293
	l32.417-59.707C431.667,563.683,442.75,563.125,442.75,563.125z"
      />
      <path
        id="103"
        className={`${
          "CAT3" in props.availableSections &&
          "103" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["103"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("103");
        }}
        d="M417.063,562.918v6.75L385.25,625.34c0,0-27.5-2.59-35-5.34c0-1.625,0-3.375,0-3.375L397,560.501
	C405.667,563.667,417.063,562.918,417.063,562.918z"
      />
      <path
        id="102"
        className={`${
          "CAT3" in props.availableSections &&
          "102" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["102"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("102");
        }}
        d="M395,559.875c-12-0.875-20.75-5.25-20.75-5.25L315.875,607v4.375c0,0,23.375,7.5,30.5,7.875
	C346.625,617,395,559.875,395,559.875z"
      />
      <path
        id="101"
        className={`${
          "CAT3" in props.availableSections &&
          "101" in props.availableSections["CAT3"] &&
          props.availableSections["CAT3"]["101"] === 1
            ? ""
            : "opacity-40"
        }`}
        onClick={() => {
          props.setCurrCategory("CAT3");
          props.setCurrSection("101");
        }}
        d="M358.667,547.834l-37.167,26.5l-6.5-2.833l-31.5,22.583v4.583c0,0,18.046,8.621,28.083,11.666
	c2.083-0.666,2.5-0.499,2.5-0.499l0.25-3.167l58-52.792L358.667,547.834z"
      />
    </svg>
  );
};
