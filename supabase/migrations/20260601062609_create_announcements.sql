CREATE TABLE announcements (
    id BIGSERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    end_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);