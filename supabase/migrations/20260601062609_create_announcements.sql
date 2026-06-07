CREATE TABLE announcements (
    id BIGSERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    end_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);