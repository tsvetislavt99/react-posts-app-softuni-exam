//Other
import { useState, useEffect } from 'react';

function Notification({ variant, children }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className={`alert notification alert-${variant}`}>{children}</div>
  );
}

Notification.defaultPros = {
  variant: 'info',
};

export default Notification;
