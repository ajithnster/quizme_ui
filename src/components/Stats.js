export const Stats = ({ stats }) => {
  return (
    <div className="stats">
      <h4>Statistics</h4>
      <ul>
        <li>Total Records: {stats.totalRecords}</li>
        <li>Records with Action Items: {stats.actionItems}</li>
        <li>Positive Sentiments: {stats.positiveSentiments}</li>
        <li>Negative Sentiments: {stats.negativeSentiments}</li>
        <li>Neutral Sentiments: {stats.neutralSentiments}</li>
        <li>Unique Themes: {stats.uniqueThemes}</li>
      </ul>
    </div>
  );
};

export default Stats;
