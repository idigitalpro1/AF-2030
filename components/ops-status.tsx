import { OPS_FALLBACKS, activeOpsAlerts } from "@/lib/ops-status";

export function OpsStatus() {
  const alerts = activeOpsAlerts();
  if (alerts.length === 0) return null;

  return (
    <section className="ops-status" aria-label="Operations status">
      <header className="ops-status__head">
        <p className="eyebrow">Ops</p>
        <h2>Status board</h2>
      </header>

      <ul className="ops-status__list">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className={`ops-status__item ops-status__item--${alert.severity}`}
          >
            <div className="ops-status__top">
              <span className="ops-status__badge">{alert.severity}</span>
              <strong>{alert.label}</strong>
              <time dateTime={alert.updatedAt}>{alert.updatedAt}</time>
            </div>
            <p>{alert.detail}</p>
            {alert.href ? (
              <a href={alert.href} target="_blank" rel="noreferrer">
                Open Network HQ
              </a>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="ops-status__fallback">
        <p className="ops-status__label">Fallbacks</p>
        <ul>
          {OPS_FALLBACKS.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer">
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
