"""empty message

Revision ID: 23ee9e7d008e
Revises: 5da14a4e4c7a
Create Date: 2018-10-15 10:59:15.154106

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "23ee9e7d008e"
down_revision = "5da14a4e4c7a"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "developer",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            server_default=sa.text("uuid_generate_v4()"),
            nullable=False,
        ),
        sa.Column("name", sa.String(length=128), nullable=False),
        sa.Column("avatar", sa.String(length=1024), nullable=False),
        sa.Column("bio", sa.String(length=1024), nullable=False),
        sa.Column("blog", sa.String(length=512), nullable=True),
        sa.Column("company", sa.String(length=128), nullable=True),
        sa.Column("login", sa.String(length=128), nullable=False),
        sa.Column("gists", sa.Integer(), nullable=False),
        sa.Column("repositories", sa.Integer(), nullable=False),
        sa.Column("followers", sa.Integer(), nullable=False),
        sa.Column("url", sa.String(length=128), nullable=False),
        sa.Column("location", sa.String(length=128), nullable=False),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
        sa.Column("deleted", sa.DateTime(), nullable=True),
        sa.Column("source", sa.String(length=50), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "developer_topic_association",
        sa.Column("developer_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("topic_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.ForeignKeyConstraint(["developer_id"], ["developer.id"]),
        sa.ForeignKeyConstraint(["topic_id"], ["topic.id"]),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("developer_topic_association")
    op.drop_table("developer")
    # ### end Alembic commands ###
