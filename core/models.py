import uuid
from django.db import models
from django.utils import timezone


class SoftDeleteQuerySet(models.QuerySet):
    def delete(self):
        # Borrado masivo (ej. desde el admin) también es lógico
        return self.update(
            is_deleted=True,
            is_active=False,
            deleted_at=timezone.now(),
        )

    def hard_delete(self):
        return super().delete()


class SoftDeleteManager(models.Manager):
    """Por defecto oculta los registros borrados."""
    def get_queryset(self):
        return SoftDeleteQuerySet(self.model, using=self._db).filter(is_deleted=False)


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = SoftDeleteManager()      # solo los no borrados
    all_objects = models.Manager()     # incluye los borrados

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        self.is_deleted = True
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save(update_fields=['is_deleted', 'is_active', 'deleted_at', 'updated_at'])

    def restore(self):
        self.is_deleted = False
        self.is_active = True
        self.deleted_at = None
        self.save(update_fields=['is_deleted', 'is_active', 'deleted_at', 'updated_at'])

    def hard_delete(self):
        super().delete()