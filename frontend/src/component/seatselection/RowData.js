export const RowData = (props) => {
  return (
    <div className="border border-solid border-main-yellow rounded-xl p-4 w-[420px] h-[154px]">
      <p className="font-inter font-black text-main-yellow italic text-xl relative uppercase">
        Section {props.section}, Row {props.row}
      </p>
      <p className="text-white">{props.available} seats available</p>
    </div>
  );
};
