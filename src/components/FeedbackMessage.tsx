type FeedbackType = "error" | "empty";

export const FeedbackMessage = ({ type }: { type: FeedbackType }) => (
  <div className={`feedback ${type}`}>
    {type === "error" 
      ? "🚨 Error al cargar películas" 
      : "🎭 No hay resultados con estos filtros"}
  </div>
);